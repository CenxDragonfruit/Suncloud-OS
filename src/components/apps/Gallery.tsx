import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  { id: 1, name: "Paisagem_Montanha.jpg", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
  { id: 2, name: "Animal_Leao.jpg", url: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400" },
  { id: 3, name: "Abstrato_Cores.jpg", url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400" },
  { id: 4, name: "Cidade_Noite.jpg", url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400" },
  { id: 5, name: "Natureza_Floresta.jpg", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
  { id: 6, name: "Praia_Por_do_Sol.jpg", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
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
    <div className="h-full bg-card/40 relative">
      {selectedImage === null ? (
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Galeria de Fotos</h2>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform border border-border/40"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col bg-black/80">
          <div className="flex items-center justify-between p-4 bg-card/60 border-b border-border/40">
            <p className="text-sm text-foreground">{images[selectedImage].name}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center">
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].name}
              className="max-w-full max-h-full object-contain"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 h-12 w-12 rounded-full bg-card/80 hover:bg-card"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 h-12 w-12 rounded-full bg-card/80 hover:bg-card"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="p-4 bg-card/60 border-t border-border/40">
            <p className="text-xs text-center text-muted-foreground">
              {selectedImage + 1} de {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
