namespace Serenity.Extensions;

/// <summary>
/// Settings for ClamAV
/// </summary>
[DefaultSectionKey(SectionKey)]
public class ClamAVSettings
{
    /// <summary>
    /// Default section key for ClamAV
    /// </summary>
    public const string SectionKey = "ClamAV";

    /// <summary>
    /// If ClamAV scanning is enabled
    /// </summary>
    public bool Enabled { get; set; } = true;

    /// <summary>
    /// Host to connect to, default is localhost
    /// </summary>
    public string Host { get; set; } = "localhost";

    /// <summary>
    /// Port to connect to, default is 3310
    /// </summary>
    public int Port { get; set; } = 3310;

    /// <summary>
    /// The temporary folder to use for uploading samples.
    /// %TEMP%\ClamAV will be used if this is not specified.
    /// If the server is remote, this must be a network
    /// share that can be accessed from both the local
    /// server and the ClamAV server. If the location
    /// that should be passed to the ClamAV server is different, 
    /// specify it in the ServerFolder setting.
    /// </summary>
    public string TemporaryFolder { get; set; }

    /// <summary>
    /// The path to the folder the ClamAV server can access the
    /// temporary file to scan. This is assumed to be
    /// same with the <see cref="TemporaryFolder"/> by default.
    /// </summary>
    public string ServerFolder { get; set; }

}