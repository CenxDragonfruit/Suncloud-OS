import { useState, useRef, useEffect } from "react";
// NOVO: Importe o ícone 'X' para o botão de fechar
import { Play, Pause, Volume2, Maximize, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const videos = [
  {
    id: 1,
    name: "Clipe_Natureza.mp4",
    thumbnail: "/thumbnails/natureza.jpg",
    duration: "1:04",
    videoUrl: "/videos/clipe_natureza.mp4",
  },
  {
    id: 2,
    name: "JIFRO_2025.mp4",
    thumbnail: "/thumbnails/ifro.jpg",
    duration: "3:16",
    videoUrl: "/videos/ifro.mp4",
  },
  {
    id: 3,
    name: "Devil_May_Cry_Brasileiro.mp4",
    thumbnail: "/thumbnails/cry.jpg",
    duration: "2:09",
    videoUrl: "/videos/cry.mp4",
  },
];

// Função helper para formatar o tempo
function formatTime(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState("0:00");

  const videoRef = useRef<HTMLVideoElement>(null);
  // NOVO: Ref para o container do player
  const playerRef = useRef<HTMLDivElement>(null);

  // 4. FUNÇÕES PARA CONTROLAR O VÍDEO
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Evita erro NaN se a duração não for carregada
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
      setCurrentTime(formatTime(currentTime));
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleGoBack = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setSelectedVideo(null);
    // MODIFICADO: Sai da tela cheia se estiver ativa
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Garante que o estado isPlaying seja atualizado por eventos nativos
  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  // NOVO: Função para controlar a Tela Cheia
  const toggleFullscreen = () => {
    // Verifica se *não* está em tela cheia
    if (!document.fullscreenElement) {
      // Pede ao *container* do player para entrar em tela cheia
      playerRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Erro ao tentar ativar a tela cheia: ${err.message} (${err.name})`
        );
      });
    } else {
      // Sai da tela cheia
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-full bg-card/40">
      {selectedVideo === null ? (
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Meus Vídeos
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-video rounded-lg overflow-hidden hover:scale-105 transition-transform border border-border/40"
              >
                {/* O resto da galeria continua igual */}
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs text-white truncate">{video.name}</p>
                  <p className="text-xs text-white/70">{video.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // MODIFICADO: Adiciona o ref ao container principal
        <div
          ref={playerRef}
          className="h-full flex flex-col bg-black"
        >
          {/* Vídeo Player */}
          <div className="flex-1 relative flex items-center justify-center bg-black">
            {/* NOVO: Botão de Voltar (X) */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
              onClick={handleGoBack}
            >
              <X className="h-5 w-5" />
            </Button>

            <video
             ref={videoRef}
            src={selectedVideo.videoUrl}
            className="w-full h-full object-contain" 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onPlay={handlePlayPause}
            onPause={handlePlayPause}
            />
            {/* Botão de play central */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying && (
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary opacity-80 hover:opacity-100"
                  onClick={togglePlay}
                >
                  <Play className="h-8 w-8" />
                </Button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-card/90 p-4 border-t border-border/40">
            <p className="text-sm font-medium text-foreground mb-3">
              {selectedVideo.name}
            </p>

            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer mb-3"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Botão de Play/Pause */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                {/* Slider de Volume */}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume * 100]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="w-20 cursor-pointer"
                  />
                </div>

                {/* Tempo */}
                <span className="text-xs text-muted-foreground ml-2">
                  {currentTime} / {selectedVideo.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* MODIFICADO: Botão de Tela Cheia */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={toggleFullscreen} // <-- Mudei a função aqui
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};