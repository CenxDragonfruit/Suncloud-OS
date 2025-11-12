import { useState, useRef, useEffect } from "react"; // NOVO: Importar
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music as MusicIcon,
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

// 1. ADICIONE A songUrl (COMO NO EXEMPLO ACIMA)
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

// 2. NOVO: FUNÇÃO HELPER DE TEMPO
function formatTime(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [selectedSection, setSelectedSection] = useState("songs");

  // 3. NOVO: ESTADOS DE CONTROLE
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // 4. NOVO: REF PARA O ÁUDIO
  const audioRef = useRef<HTMLAudioElement>(null);

  // 5. NOVO: LÓGICA PRINCIPAL DO PLAYER
  useEffect(() => {
    if (audioRef.current) {
      // Se a música mudou, atualiza o 'src'
      if (audioRef.current.src !== currentSong.songUrl) {
        audioRef.current.src = currentSong.songUrl;
        audioRef.current.load();
      }

      // Controla play/pause
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Erro ao tocar:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]); // Roda sempre que isPlaying ou currentSong mudam

  // 6. NOVO: FUNÇÕES DE EVENTO DO ÁUDIO
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
    const nextIndex = (currentIndex + 1) % songs.length; // Volta pro início se acabar
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true); // Continua tocando
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length; // Vai pro fim se estiver no início
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true); // Continua tocando
  };

  return (
    <div className="h-full flex flex-col bg-card/40">
      {/* 7. NOVO: TAG DE ÁUDIO INVISÍVEL */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadataLoaded}
        onEnded={handleNextSong} // Toca a próxima quando a música acabar
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-border/40 bg-card/60">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2">
              BIBLIOTECA
            </h3>
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
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Todas as Músicas
              </h2>
              <div className="space-y-2">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentSong(song);
                      setIsPlaying(true); // O useEffect vai cuidar de tocar
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
                        <p className="text-sm font-medium text-foreground">
                          {song.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {song.duration}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Player Controls (MODIFICADO) */}
      <div className="border-t border-border/40 bg-card/80 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentSong.artist}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={handlePrevSong} // 8. CONECTADO
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 bg-primary hover:bg-primary/90"
              onClick={() => setIsPlaying(!isPlaying)} // 8. CONECTADO
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={handleNextSong} // 8. CONECTADO
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1" />
        </div>

        <Slider
          value={[progress]} // 8. CONECTADO
          max={100}
          step={0.1}
          onValueChange={handleSeek} // 8. CONECTADO
          className="cursor-pointer"
        />

        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {currentTime}
          </span>{" "}
          {/* 8. CONECTADO */}
          <span className="text-xs text-muted-foreground">{duration}</span>{" "}
          {/* 8. CONECTADO */}
        </div>
      </div>
    </div>
  );
};