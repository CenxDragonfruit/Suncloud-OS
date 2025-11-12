import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Music as MusicIcon } from "lucide-react";
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
  { id: 1, title: "Noite Estrelada", artist: "Luna Dreams", duration: "3:45" },
  { id: 2, title: "Vento do Sul", artist: "Acoustic Vibes", duration: "4:12" },
  { id: 3, title: "Chuva Serena", artist: "Nature Sounds", duration: "5:30" },
  { id: 4, title: "Dança Eletrônica", artist: "Digital Beats", duration: "3:20" },
  { id: 5, title: "Jazz na Madrugada", artist: "Smooth Jazz", duration: "6:15" },
];

export const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [selectedSection, setSelectedSection] = useState("songs");

  return (
    <div className="h-full flex flex-col bg-card/40">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-border/40 bg-card/60">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2">BIBLIOTECA</h3>
            <div className="space-y-1">
              {library.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSection === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-foreground hover:bg-secondary/50"
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
              <h2 className="text-xl font-semibold text-foreground mb-4">Todas as Músicas</h2>
              <div className="space-y-2">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentSong(song);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      currentSong.id === song.id
                        ? "bg-primary/20"
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <MusicIcon className="h-5 w-5 text-white" />
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
      <div className="border-t border-border/40 bg-card/80 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 bg-primary hover:bg-primary/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1" />
        </div>
        
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="cursor-pointer"
        />
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">1:23</span>
          <span className="text-xs text-muted-foreground">{currentSong.duration}</span>
        </div>
      </div>
    </div>
  );
};
