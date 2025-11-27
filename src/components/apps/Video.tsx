import { useState, useRef } from "react";
import { Play, Pause, Volume2, Maximize, X, Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

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

function formatTime(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

export const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState("0:00");

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

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
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Erro ao tentar ativar a tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-full bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {selectedVideo === null ? (
        <ScrollArea className="h-full">
          <div className="relative z-10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center glow-amber">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Holo Cinema</h2>
                <p className="text-xs text-amber-400/70">Reprodução Neural</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-border/40 hover:border-amber-500/50 transition-all duration-300"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center glow-amber">
                      <Play className="h-7 w-7 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-xs text-white truncate">{video.name}</p>
                    <p className="text-xs text-amber-400">{video.duration}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div ref={playerRef} className="h-full flex flex-col bg-black relative">
          {/* Holographic border */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 100px rgba(245, 158, 11, 0.1)'
          }} />

          {/* Video Player */}
          <div className="flex-1 relative flex items-center justify-center bg-black">
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-amber-500/30 hover:text-amber-400"
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
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {!isPlaying && (
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 opacity-80 hover:opacity-100 pointer-events-auto glow-amber"
                  onClick={togglePlay}
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="relative z-10 bg-card/90 backdrop-blur-xl p-4 border-t border-amber-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-sm font-medium text-foreground">{selectedVideo.name}</p>
            </div>

            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer mb-3"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-amber-500/20 hover:text-amber-400"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

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

                <span className="text-xs text-muted-foreground ml-2">
                  {currentTime} / {selectedVideo.duration}
                </span>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-amber-500/20 hover:text-amber-400"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
