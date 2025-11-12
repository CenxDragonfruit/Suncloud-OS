import { useState } from "react";
import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const videos = [
  { id: 1, name: "Clipe_Natureza.mp4", thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", duration: "5:32" },
  { id: 2, name: "Tutorial_Suncloud.mp4", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400", duration: "12:45" },
  { id: 3, name: "Documentario_Oceano.mp4", thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", duration: "45:20" },
  { id: 4, name: "Animacao_3D.mp4", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400", duration: "3:15" },
  { id: 5, name: "Viagem_Aereo.mp4", thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400", duration: "8:50" },
  { id: 6, name: "Receita_Culinaria.mp4", thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400", duration: "10:30" },
];

export const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full bg-card/40">
      {selectedVideo === null ? (
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Meus Vídeos</h2>
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-video rounded-lg overflow-hidden hover:scale-105 transition-transform border border-border/40"
              >
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
        <div className="h-full flex flex-col bg-black">
          {/* Video Player */}
          <div className="flex-1 relative flex items-center justify-center bg-black">
            <img
              src={selectedVideo.thumbnail}
              alt={selectedVideo.name}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-card/90 p-4 border-t border-border/40">
            <p className="text-sm font-medium text-foreground mb-3">
              {selectedVideo.name}
            </p>
            
            <Slider
              defaultValue={[25]}
              max={100}
              step={1}
              className="cursor-pointer mb-3"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    defaultValue={[70]}
                    max={100}
                    step={1}
                    className="w-20 cursor-pointer"
                  />
                </div>
                
                <span className="text-xs text-muted-foreground ml-2">
                  1:23 / {selectedVideo.duration}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setSelectedVideo(null)}
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
