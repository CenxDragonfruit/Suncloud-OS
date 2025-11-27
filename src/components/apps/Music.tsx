import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music as MusicIcon,
  Volume2,
  Disc3,
  Sparkles,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

const library = [
  { id: "songs", name: "Músicas", count: 127 },
  { id: "albums", name: "Álbuns", count: 15 },
  { id: "artists", name: "Artistas", count: 42 },
  { id: "playlists", name: "Playlists", count: 8 },
];

const songs = [
  {
    id: 1,
    title: "Ai se eu te pego",
    artist: "Michel Teló",
    duration: "2:48",
    songUrl: "/audio/ai_se_eu_te_pego.mp3",
  },
  {
    id: 2,
    title: "Blank Space",
    artist: "Taylor Swift",
    duration: "4:33",
    songUrl: "/audio/blank_space.mp3",
  },
  {
    id: 3,
    title: "Dame tu Cosita",
    artist: "El Chombo",
    duration: "2:33",
    songUrl: "/audio/dame_tu_cosita.mp3",
  },
];

function formatTime(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [selectedSection, setSelectedSection] = useState("songs");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (audioRef.current.src !== currentSong.songUrl) {
        audioRef.current.src = currentSong.songUrl;
        audioRef.current.load();
      }

      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Erro ao tocar:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (!isNaN(duration)) {
        setProgress((currentTime / duration) * 100);
        setCurrentTime(formatTime(currentTime));
      }
    }
  };

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration;
      setProgress(value[0]);
    }
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="h-full flex flex-col bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadataLoaded}
        onEnded={handleNextSong}
      />

      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r border-border/40 bg-card/60 backdrop-blur-xl">
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-violet-400" />
              <span className="font-semibold text-foreground text-glow-violet">SoundWave</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xs font-semibold text-violet-400/70 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              BIBLIOTECA
            </h3>
            <div className="space-y-1">
              {library.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedSection === item.id
                      ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30"
                      : "text-foreground hover:bg-secondary/50 hover:text-violet-400"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <MusicIcon className="w-5 h-5 text-violet-400" />
                Todas as Músicas
              </h2>
              <div className="space-y-2">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentSong(song);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      currentSong.id === song.id
                        ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 glow-violet"
                        : "hover:bg-card/60 border border-transparent hover:border-border/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg ${currentSong.id === song.id ? "animate-pulse" : ""}`}>
                        {currentSong.id === song.id && isPlaying ? (
                          <Disc3 className="h-6 w-6 text-white animate-spin" style={{ animationDuration: '3s' }} />
                        ) : (
                          <MusicIcon className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{song.title}</p>
                        <p className="text-xs text-muted-foreground">{song.artist}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{song.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Player Controls */}
      <div className="relative z-10 border-t border-border/40 bg-card/80 backdrop-blur-xl p-4">
        {/* Progress visualization */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted/30">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              {isPlaying ? (
                <Disc3 className="h-5 w-5 text-white animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                <MusicIcon className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{currentSong.title}</p>
              <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-violet-500/20 hover:text-violet-400"
              onClick={handlePrevSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-12 w-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 rounded-full glow-violet"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-violet-500/20 hover:text-violet-400"
              onClick={handleNextSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-end gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              defaultValue={[70]}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>

        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />

        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">{currentTime}</span>
          <span className="text-xs text-muted-foreground">{duration}</span>
        </div>
      </div>
    </div>
  );
};
