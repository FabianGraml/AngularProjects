using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlaylistEditorV2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

namespace PlaylistEditorV2.Controllers
{
    [Route("api")]
    [ApiController]
    public class PlaylistEditorController : ControllerBase
    {


        private readonly static CSVReader CSVReader = new CSVReader();

        private readonly static List<Track> tracksList = CSVReader.GetTracksFromCsv();
        private readonly static List<Playlist> playlistsList = CSVReader.GetPlaylistsFromCsv();
        private readonly static List<Genre> genresList = CSVReader.GetGenresFromCsv();
        private readonly static List<Album> albumsList = CSVReader.GetAlbumsFromCsv();
        private readonly static List<PlaylistTrack> playlistTracksList = CSVReader.GetPlaylistTracksFromCsv();




        [HttpGet("albums")]
        public IActionResult GetAlbums()
        {

            return Ok(albumsList);
        }
        [HttpGet("genres")]
        public IActionResult GetGenres()
        {
            return Ok(genresList);
        }
        [HttpGet("playlists")]
        public IActionResult GetPlaylists()
        {
            return Ok(playlistsList);
        }
        [HttpGet] 
        [Route("tracks")]
        public IActionResult GetAllItemsSorted([FromQuery] string genreId)
        {
            return Ok(tracksList.Where(x => x.GenreId == int.Parse(genreId)).ToList());
        }
        [HttpGet("playlisttracks/{playlistId}")]
        public IActionResult GetTracksOfPlaylist(int playlistId)
        {
            var tracksOfPlaylist = playlistTracksList.Where(x => x.PlaylistId == playlistId).Select(x => x.TrackId).ToList();

         
            return Ok(tracksList.Where(x => tracksOfPlaylist.Select(y => y).Contains(x.TrackId)).ToList());
        }
        [HttpPost("track")]
        public IActionResult AddTrack([FromBody] PlaylistTrack playlistTrack)
        {
          
            playlistTracksList.Add(playlistTrack);
            return Ok();
        }
        [HttpDelete]
        [Route("track")]
        public IActionResult DeleteItem([FromQuery]int playlistId, [FromQuery]int trackId)
        {

            playlistTracksList.RemoveAll(x => x.PlaylistId == playlistId && x.TrackId == trackId);
           
            return NoContent();
        }


    }
}
