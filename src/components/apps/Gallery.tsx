import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, Sparkles, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const images = [
  { id: 1, name: "tigre.jpg", url: "https://preview.redd.it/valendo-tr%C3%AAs-pratos-de-trigo-para-tr%C3%AAs-tigres-tristes-qual-v0-dgep8grsnilc1.png?width=896&auto=webp&s=d61a295a85d4220701b795508c621092753f7bd8" },
  { id: 2, name: "amizade.jpg", url: "https://bhaz.com.br/wp-content/uploads/2022/11/lula-e-bolsonaro-1024x576.jpg" },
  { id: 3, name: "formatura.jpg", url: "https://www.ifro.edu.br/images/formatura-ifro.jpg" },
  { id: 4, name: "os_simpsons.jpg", url: "https://www.format.com/wp-content/uploads/cursed-images-22.jpg" },
  { id: 5, name: "shrek.jpg", url: "https://images3.memedroid.com/images/UPLOADED405/5d425bfb1cc2a.jpeg" },
  { id: 6, name: "naruto.jpg", url: "https://falaanimal.com.br/wp-content/uploads/2024/02/naruto_29022024-800x445.jpg" },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="h-full bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {selectedImage === null ? (
        <ScrollArea className="h-full">
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center glow-violet">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground text-glow-violet">Holo Gallery</h2>
                  <p className="text-xs text-violet-400/70">Memórias Digitais</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Grid3X3 className="w-4 h-4" />
                <span>{images.length} itens</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-border/40 hover:border-violet-500/50 transition-all duration-300"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-xs text-white truncate">{image.name}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/50 rounded-xl transition-all" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="h-full flex flex-col bg-black/90 relative">
          {/* Holographic border effect */}
          <div className="absolute inset-0 pointer-events-none border-4 border-transparent" style={{
            background: 'linear-gradient(black, black) padding-box, linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3)) border-box'
          }} />

          <div className="relative z-10 flex items-center justify-between p-4 bg-card/60 backdrop-blur-xl border-b border-violet-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <p className="text-sm text-foreground">{images[selectedImage].name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
              className="hover:bg-violet-500/20 hover:text-violet-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative z-10 flex-1 relative flex items-center justify-center p-4">
            <div className="relative rounded-xl overflow-hidden glow-violet">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].name}
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 h-12 w-12 rounded-full bg-card/80 backdrop-blur-xl border border-violet-500/30 hover:bg-violet-500/20 hover:text-violet-400"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 h-12 w-12 rounded-full bg-card/80 backdrop-blur-xl border border-violet-500/30 hover:bg-violet-500/20 hover:text-violet-400"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="relative z-10 p-4 bg-card/60 backdrop-blur-xl border-t border-violet-500/30">
            <div className="flex items-center justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index 
                      ? "bg-violet-400 w-6" 
                      : "bg-muted-foreground/50 hover:bg-violet-400/50"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              {selectedImage + 1} de {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
