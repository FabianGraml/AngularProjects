namespace TeeOnline.Exceptions
{
    [Serializable]
    public class NoPlayerException : Exception
    {
        public NoPlayerException() { }
        public NoPlayerException(string message) : base(message) { }
    }
}
