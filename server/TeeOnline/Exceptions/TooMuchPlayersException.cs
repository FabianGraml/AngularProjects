namespace TeeOnline.Exceptions
{
    [Serializable]
    public class TooMuchPlayersException : Exception
    {
        public TooMuchPlayersException() { }
        public TooMuchPlayersException(string message) : base(message) { }
    }
}
