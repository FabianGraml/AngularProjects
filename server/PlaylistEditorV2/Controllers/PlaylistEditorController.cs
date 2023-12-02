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
    public IActionResult GetAllItemsSorted([FromQuery] int genreId)
    {
      if (genreId >= 1)
      {
        var tracksOfGenre = tracksList.Where(x => x.GenreId == genreId).ToList();
        if (tracksOfGenre.Count > 0)
        {
          return Ok(tracksOfGenre);
        }
        else
        {
          return NotFound($"Cannot find genre with id: {genreId}");
        }
      }
      else
      {
        return BadRequest($"Input a GenreId: {genreId} greater than zero");
      }
    }
    [HttpGet("playlisttracks/{playlistId}")]
    public IActionResult GetTracksOfPlaylist(int playlistId)
    {
      if (playlistId >= 1)
      {
        var playlist = playlistsList.Where(x => x.PlaylistId == playlistId).FirstOrDefault();
        if (playlist != null)
        {
          var tracksOfPlaylist = playlistTracksList.Where(x => x.PlaylistId == playlistId).Select(x => x.TrackId).ToList();
          return Ok(tracksList.Where(x => tracksOfPlaylist.Select(y => y).Contains(x.TrackId)).ToList());
        }
        else
        {
          return NotFound($"Cannot find Playlist for playlistId: {playlistId}");
        }

      }
      else
      {
        return BadRequest("Input a playlistId greater than zero");
      }
    }

    [HttpPost("track")]
    public IActionResult AddTrack([FromBody] PlaylistTrack playlistTrack)
    {
      var track = tracksList.Where(x => x.TrackId == playlistTrack.TrackId).FirstOrDefault();
      var playlist = playlistsList.Where(x => x.PlaylistId == playlistTrack.PlaylistId).FirstOrDefault();

      var playlistTracks = playlistTracksList.Where(x => x.PlaylistId == playlistTrack.PlaylistId && x.TrackId == playlistTrack.TrackId).FirstOrDefault();

      if (playlistTrack.PlaylistId >= 1 && playlistTrack.TrackId >= 1)
      {
        if (playlistTracks == null)
        {
          if (track != null && playlist != null)
          {
            playlistTracksList.Add(playlistTrack);
            return Created("Created", playlistTrack);
          }
          else
          {
            return NotFound("Couldn't find Playlist or Track");
          }
        }
        else
        {
          return BadRequest("Song is already in this list");
        }
      }
      else
      {
        return BadRequest($"Mandatory fields missing or playlistId/trackId is zero");
      }
    }
    [HttpDelete]
    [Route("track")]
    public IActionResult DeleteItem([FromQuery] int playlistId, [FromQuery] int trackId)
    {
      if (playlistId >= 1 && trackId >= 1)
      {
        var elementToDelete = playlistTracksList.Where(x => x.PlaylistId == playlistId && x.TrackId == trackId).FirstOrDefault();
        if (elementToDelete != null)
        {
          playlistTracksList.RemoveAll(x => x.PlaylistId == playlistId && x.TrackId == trackId);
          return NoContent();
        }
        else
        {
          return NotFound("Couldn't find Playlist or Track");

        }
      }
      else
      {
        return BadRequest($"TrackId: {trackId} or PlaylistId: {playlistId} must be greater than zero");

      }
    }
  }
}
