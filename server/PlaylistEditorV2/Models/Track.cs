using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlaylistEditorV2.Models
{
    public class Track
    {
        public int TrackId { get; set; }
        public string TrackName { get; set; }
        public int AlbumId { get; set; }
        public int GenreId { get; set; }
        public int Milliseconds { get; set; }



    }
}
