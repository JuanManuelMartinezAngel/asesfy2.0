import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Listo para entender cómo funciona Asesfy en 60 segundos?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-card border-border shadow-card overflow-hidden">
            <CardContent className="p-0">
              {/* Video Player */}
              <div className="relative aspect-video bg-background">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster="/video-intro-poster.jpg"
                >
                  <source src="/video-intro.mp4" type="video/mp4" />
                  <p className="text-muted-foreground text-center p-8">
                    Tu navegador no soporta la reproducción de video.
                  </p>
                </video>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            variant="cta"
            size="xl"
            onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
          >
            Empezar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;