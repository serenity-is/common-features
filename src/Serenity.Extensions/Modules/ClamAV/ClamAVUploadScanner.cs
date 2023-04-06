using Microsoft.Extensions.Logging;
using nClam;
using System.IO;
using System.Threading.Tasks;

/// <summary>
/// Implementation of <see cref="IUploadAVScanner"/> which connects to ClamAV service
/// (https://www.clamav.net/ - Windows: https://oss.netfarm.it/clamav/), 
/// using the nClam library (https://github.com/tekmaven/nClam)
/// </summary>
namespace Serenity.Extensions;

/// <summary>
/// Implementation of <see cref="IUploadAVScanner"/> which connects to ClamAV service
/// </summary>
public class ClamAVUploadScanner : IUploadAVScanner
{
    private readonly IOptionsMonitor<ClamAVSettings> options;
    private readonly ITextLocalizer localizer;
    private readonly ILogger<ClamAVUploadScanner> logger;
    private readonly IExceptionLogger exceptionLog;

    /// <summary>
    /// Creates a new instance of the class.
    /// </summary>
    /// <param name="options">Options</param>
    /// <param name="localizer">Text localizer</param>
    /// <param name="logger">Log</param>
    /// <param name="exceptionLog">Exception log</param>
    /// <exception cref="ArgumentNullException">One of arguments is null</exception>
    public ClamAVUploadScanner(IOptionsMonitor<ClamAVSettings> options,
        ITextLocalizer localizer = null,
        ILogger<ClamAVUploadScanner> logger = null,
        IExceptionLogger exceptionLog = null)
    {
        this.options = options ?? throw new ArgumentNullException(nameof(options));
        this.localizer = localizer;
        this.logger = logger;
        this.exceptionLog = exceptionLog;
    }

    /// <summary>
    /// Processes a temporary upload stream, usually from the HTTP request files and
    /// returns false 
    /// </summary>
    /// <param name="stream">File content stream (usually from HTTP request files)</param>
    /// <param name="filename">The filename of the uploaded file (original name)</param>
    public void Scan(Stream stream, string filename)
    {
        string tempFile = null;
        try
        {
            // please install ClamAV on your server, otherwise all uploads will fail
            // it is assumed to be running at localhost:3310 by default
            // to disable AV scan, set the ClamAV:Port in appsettings.json to -1

            var host = options.CurrentValue.Host;
            if (string.IsNullOrEmpty(host))
                host = "localhost";
            var settings = options.CurrentValue;
            var port = settings.Port;

            var tempName = Path.ChangeExtension(Guid.NewGuid().ToString("n"),
                Path.GetExtension(filename));

            var tempFolder = settings.TemporaryFolder;
            if (string.IsNullOrEmpty(tempFolder))
                tempFolder = Path.Combine(Path.GetTempPath(), "ClamAV");

            if (!Directory.Exists(tempFolder))
                Directory.CreateDirectory(tempFolder);

            tempFile = Path.Combine(tempFolder, tempName);

            using (var tempStream = File.Create(tempFile))
                stream.CopyTo(tempStream);

            var clam = new ClamClient(host, port);
            var serverFile = string.IsNullOrEmpty(settings.ServerFolder) ?
                tempFile : Path.Combine(settings.ServerFolder, Path.GetFileName(filename));

            var scanResult = Task.Run(() => clam.ScanFileOnServerAsync(serverFile)).Result;

            switch (scanResult.Result)
            {
                case ClamScanResults.VirusDetected:
                    logger?.LogError("Virus {virus} found in file getting uploaded: {filename}",
                        scanResult.InfectedFiles.First().VirusName,
                        filename);

                    exceptionLog?.Log(new ValidationError($"Virus {scanResult.InfectedFiles.First().VirusName} " +
                        $"found in file getting uploaded: {filename}"), "VirusScan");

                    throw new ValidationError("InfectedFile",
                        UploadTexts.Controls.ImageUpload.InfectedFile.ToString(localizer));

                case ClamScanResults.Unknown:
                case ClamScanResults.Error:
                    // reaching here does not mean the uploaded file is virus free
                    // another antivirus might have deleted the temporary file before scan
                    logger?.LogError("Error occured during AV scan: {error}",
                        scanResult.RawResult);

                    exceptionLog?.Log(new ValidationError("Error occured during AV scan: " +
                        scanResult.RawResult), "VirusScan");

                    throw new ValidationError("InfectedFileOrError",
                        UploadTexts.Controls.ImageUpload.InfectedFileOrError.ToString(localizer));
            }
        }
        catch (Exception ex) when (ex is not ValidationError)
        {
            logger?.LogError("Exception occured during AV scan (is ClamAV installed?)");
            exceptionLog?.Log(new ValidationError("Error occured during AV scan (is ClamAV installed?)"), "VirusScan");
            ex.Log(exceptionLog);

            throw new ValidationError("FailedScan",
                UploadTexts.Controls.ImageUpload.FailedScan.ToString(localizer));
        }
        finally
        {
            if (tempFile != null)
                try
                {
                    if (File.Exists(tempFile))
                        File.Delete(tempFile);
                }
                catch
                {
                }
        }
    }
}