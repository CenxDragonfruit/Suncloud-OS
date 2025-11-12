import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
