namespace Build
{
    partial class Program
    {
        static void Main(string[] args)
        {
            var target = args != null && args.Length > 0 ? args[0] : "pack";

            Shared.DetermineRoot();

            if (target == "pack")
                Shared.Targets.Pack();
            else if (target == "push")
                Targets.Push();
        }
    }
}