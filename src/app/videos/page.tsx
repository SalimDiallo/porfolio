import { Flex, Meta, Schema, Heading, Column, Text } from "@once-ui-system/core";
import { baseURL, videos, person } from "@/resources";
import VideoCard from "@/components/videos/VideoCard";

export async function generateMetadata() {
  return Meta.generate({
    title: videos.title,
    description: videos.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(videos.title)}`,
    path: videos.path,
  });
}

export default function Videos() {
  return (
    <Flex
      maxWidth="l"
      fillWidth
      gap="l"
      paddingY="l"
      paddingX="m"
      direction="column"
      style={{
        position: "relative",
      }}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={videos.title}
        description={videos.description}
        path={videos.path}
        image={`/api/og/generate?title=${encodeURIComponent(videos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${videos.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="m">
        <Heading variant="display-strong-l" wrap="balance">
          {videos.label}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {videos.description}
        </Text>
      </Column>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
          gap: "clamp(1rem, 3vw, 1.5rem)",
          width: "100%",
        }}
      >
        {videos.videos.map((video) => (
          <VideoCard key={video.url} video={video} />
        ))}
      </div>
    </Flex>
  );
}
