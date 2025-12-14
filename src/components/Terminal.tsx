"use client";

import { useEffect, useState } from "react";
import { Card, Text } from "@once-ui-system/core";

interface TerminalProps {
  lines?: string[];
  typingSpeed?: number;
}

export function Terminal({
  lines = [
    "$ cd ~/projects",
    "$ ls -la",
    "portfolio/  data-engineering/  web-apps/  ai-tools/",
    "$ cat skills.txt",
    "Full-Stack Development ✓",
    "Data Engineering & AI ✓",
    "Python | Django | Next.js ✓",
    "PostgreSQL | MongoDB ✓",
    "$ echo 'Ready to build amazing things 🚀'",
    "Ready to build amazing things 🚀"
  ],
  typingSpeed = 50
}: TerminalProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, currentText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines([...displayedLines, currentText]);
      setCurrentText("");
      setCurrentLineIndex(currentLineIndex + 1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentText, currentLineIndex, lines, displayedLines, typingSpeed]);

  return (
    <Card
      padding="l"
      border="neutral-medium"
      radius="l"
      fillWidth
      style={{
        backgroundColor: "var(--neutral-alpha-weak)",
        fontFamily: "var(--font-code)",
        fontSize: "14px",
        width: "100%",
        overflow: "hidden",
        display: "block",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid var(--neutral-alpha-medium)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#27c93f",
            }}
          />
        </div>
        <Text
          variant="label-default-s"
          onBackground="neutral-weak"
          style={{ fontWeight: 500 }}
        >
          terminal
        </Text>
      </div>

      <div
        style={{
          minHeight: "200px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        {displayedLines.map((line) => (
          <div
            key={`${line}-${displayedLines.indexOf(line)}`}
            style={{
              marginBottom: "8px",
              color: line.startsWith("$")
                ? "var(--brand-on-background-medium)"
                : line.includes("✓")
                  ? "var(--accent-on-background-medium)"
                  : "var(--neutral-on-background-weak)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {line}
          </div>
        ))}

        {currentText && (
          <div
            style={{
              marginBottom: "8px",
              color: currentText.startsWith("$")
                ? "var(--brand-on-background-medium)"
                : currentText.includes("✓")
                  ? "var(--accent-on-background-medium)"
                  : "var(--neutral-on-background-weak)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {currentText}
            {isTyping && (
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "16px",
                  backgroundColor: "var(--brand-on-background-medium)",
                  marginLeft: "2px",
                  animation: "blink 1s infinite",
                }}
              />
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </Card>
  );
}
