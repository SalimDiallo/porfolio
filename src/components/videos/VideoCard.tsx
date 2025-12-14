"use client";

import { Column, Text, Card } from "@once-ui-system/core";
import { useState } from "react";

interface VideoCardProps {
  video: {
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
  };
}

// Fonction pour extraire l'ID de la vidéo YouTube depuis l'URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const videoId = getYouTubeVideoId(video.url);

  if (!videoId) {
    return (
      <Card padding="l" border="neutral-medium" radius="l">
        <Column gap="m">
          <Text variant="heading-strong-m">{video.title}</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            URL YouTube invalide
          </Text>
        </Column>
      </Card>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  // Liste des URLs de thumbnail par ordre de préférence (du meilleur au moins bon)
  const thumbnailUrls = video.thumbnail
    ? [video.thumbnail]
    : [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/default.jpg`,
      ];

  const thumbnailUrl = thumbnailUrls[currentThumbnailIndex];

  // Gérer l'erreur de chargement en essayant la prochaine résolution
  const handleImageError = () => {
    if (currentThumbnailIndex < thumbnailUrls.length - 1) {
      setCurrentThumbnailIndex(currentThumbnailIndex + 1);
    }
  };

  return (
    <Card
      padding="0"
      border="neutral-medium"
      radius="l"
      overflow="hidden"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Column gap="0" fillWidth>
        {/* Video Player */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            overflow: "hidden",
            backgroundColor: "var(--neutral-alpha-weak)",
            cursor: isLoaded ? "default" : "pointer",
          }}
        >
          {!isLoaded && (
            <img
              src={thumbnailUrl}
              alt={video.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onClick={() => setIsLoaded(true)}
              onError={handleImageError}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsLoaded(true);
                }
              }}
            />
          )}
          {!isLoaded && (
            <button
              onClick={() => setIsLoaded(true)}
              type="button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "68px",
                height: "48px",
                backgroundColor: "rgba(255, 0, 0, 0.9)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
              }}
              aria-label="Lire la vidéo"
            >
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%" aria-hidden="true">
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#fff"
                />
                <path d="M 45,24 27,14 27,34" fill="#ff0000" />
              </svg>
            </button>
          )}
          {isLoaded && (
            <iframe
              src={embedUrl}
              title={video.title || "Vidéo YouTube"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          )}
        </div>

        {/* Video Info */}
        <Column
          gap="s"
          padding="l"
          style={{
            padding: "clamp(0.75rem, 2vw, 1.5rem)",
          }}
        >
          <Text
            variant="heading-strong-m"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            }}
          >
            {video.title}
          </Text>
          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            style={{
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: "1.6",
            }}
          >
            {video.description}
          </Text>
        </Column>
      </Column>
    </Card>
  );
}
