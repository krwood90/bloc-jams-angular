(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc Plays selected song and set playing to true
         * @param {object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @function getSongIndex
         * @desc finds current song from album
         * @param {object} songIndex
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.currentSong = null;

        /**
         * @function play
         * @desc Plays a new song when clicked, or plays the current song which has been paused
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;

            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function puase
         * @desc Pauses the currently playing song when clicked
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @desc goes to previous song
         * @param {object} currentSongIndex
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();