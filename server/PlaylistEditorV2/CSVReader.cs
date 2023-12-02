using PlaylistEditorV2.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PlaylistEditorV2
{
    public class CSVReader
    {


        public List<Track> trackList = new List<Track>();
        public CSVReader() { }
        public List<Album> GetAlbumsFromCsv()
        {

            var linesWithGoodFormat = File.ReadAllLines("./csv/album.csv").Skip(1).Select(x => x.Replace(", ", ";").Replace("\"", "").Replace("\r", "")).ToList();

            var albums = new List<Album>();
            foreach (var lineWithGoodFormat in linesWithGoodFormat)
            {
                var line = lineWithGoodFormat.Split(",");

                var aId = int.Parse(line[0]);
                var at = line[1];
                var atid = int.Parse(line[2]);

                albums.Add(new Album() { AlbumId = int.Parse(line[0]), AlbumTitle = line[1], ArtistId = int.Parse(line[2]) });

            }
            return albums;
        }
    
        public List<Genre> GetGenresFromCsv()
        {

            var linesWithGoodFormat = File.ReadAllLines("./csv/genre.csv").Skip(1).Select(x => x.Replace(", ", ";").Replace("\"", "").Replace("\r", "")).ToList();

            var genres = new List<Genre>();
            foreach (var lineWithGoodFormat in linesWithGoodFormat)
            {
                var line = lineWithGoodFormat.Split(",");

             

                genres.Add(new Genre() { GenreId = int.Parse(line[0]), GenreName = line[1] });

            }
            return genres;
        }
        public List<Playlist> GetPlaylistsFromCsv()
        {

            var linesWithGoodFormat = File.ReadAllLines("./csv/playlist.csv").Skip(1).Select(x => x.Replace(", ", ";").Replace("\"", "").Replace("\r", "")).ToList();

            var playlists = new List<Playlist>();
            foreach (var lineWithGoodFormat in linesWithGoodFormat)
            {
                var line = lineWithGoodFormat.Split(",");



                playlists.Add(new Playlist() { PlaylistId = int.Parse(line[0]), PlaylistName = line[1] });

            }
            return playlists;
        }
        public List<Track> GetTracksFromCsv()
        {

            var linesWithGoodFormat = File.ReadAllLines("./csv/track.csv").Skip(1).Select(x => x.Replace(", ", ";").Replace(",/", ";").Replace("\"", "").Replace("\r", "").Replace("/", " ")).ToList();

            foreach (var lineWithGoodFormat in linesWithGoodFormat)
            {
                var line = lineWithGoodFormat.Split(",");

                trackList.Add(new Track() { 
                    TrackId  = int.Parse(line[0]), 
                    TrackName = line[1], 
                    AlbumId = int.Parse(line[2]), 
                    GenreId = int.Parse(line[4]),  
                    Milliseconds=int.Parse(line[6])});
           }
            return trackList;
        }
        public List<PlaylistTrack> GetPlaylistTracksFromCsv()
        {

            var linesWithGoodFormat = File.ReadAllLines("./csv/playlist-track.csv").Skip(1).Select(x => x.Replace(", ", ";").Replace("\"", "").Replace("\r", "")).ToList();

            var playlistTracks = new List<PlaylistTrack>();
            foreach (var lineWithGoodFormat in linesWithGoodFormat)
            {
                var line = lineWithGoodFormat.Split(",");



                playlistTracks.Add(new PlaylistTrack() { PlaylistId = int.Parse(line[0]), TrackId = int.Parse(line[1]) });

            }
            return playlistTracks;
        }

    }
}
            
              
 


