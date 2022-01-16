namespace TeeOnline.Exceptions
{
    [Serializable]
    public class NoFreeSlotException : Exception
    {
        public NoFreeSlotException() { }
        public NoFreeSlotException(string message) : base(message) { }
    }
}
