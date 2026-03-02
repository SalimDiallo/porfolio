import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp, Terminal } from "@/components";
import { ProjectsServer } from "@/components/work/ProjectsServer";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column
        fillWidth
        gap="l"
        paddingBottom="xl"
        horizontal="center"
        align="center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {home.featured.display && (
          <RevealFx translateY="4">
            <Badge
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}

        <RevealFx translateY="4" delay={0.1} fillWidth horizontal="center">
          <Heading wrap="balance" variant="display-strong-xl" align="center">
            {home.headline}
          </Heading>
        </RevealFx>

        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" >   
          <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l" align="center">
            {home.subline}
          </Text>
        </RevealFx>

        <RevealFx delay={0.3}>
          <Row gap="m" horizontal="center" wrap>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="l"
              arrowIcon
            >
              <Row gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar style={{ marginLeft: "-0.5rem" }} src={person.avatar} size="m" />
                )}
                {about.label}
              </Row>
            </Button>
            {routes["/work"] && (
              <Button data-border="rounded" href="/work" variant="tertiary" size="l" arrowIcon>
                Voir mes projets
              </Button>
            )}
          </Row>
        </RevealFx>
      </Column>

      {/* Terminal animé */}
      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Terminal />
      </RevealFx>

      {/* Section Projets en vedette */}
      <RevealFx translateY="16" delay={0.5}>
        <Column fillWidth gap="l">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-m">
              Projets récents
            </Heading>
            <Button href="/work" variant="tertiary" size="m" arrowIcon>
              Voir tous les projets
            </Button>
          </Row>
          <ProjectsServer range={[1, 4]} />
        </Column>
      </RevealFx>

      {/* Section Blog */}
      {routes["/blog"] && (
        <RevealFx translateY="16" delay={0.6}>
          <Column fillWidth gap="l" paddingY="l">
            <Row fillWidth horizontal="between" vertical="center">
              <Heading as="h2" variant="display-strong-m">
                Derniers articles
              </Heading>
              <Button href="/blog" variant="tertiary" size="m" arrowIcon>
                Tous les articles
              </Button>
            </Row>
            <Posts range={[1, 2]} columns="2" />
          </Column>
        </RevealFx>
      )}

      {/* Newsletter */}
      <RevealFx translateY="16" delay={0.8}>
        <Mailchimp />
      </RevealFx>
    </Column>
  );
}
