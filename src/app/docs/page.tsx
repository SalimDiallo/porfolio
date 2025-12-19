"use client";

import {
  Column,
  Heading,
  Text,
  Icon,
  Row,
  Tag,
  Meta,
} from "@once-ui-system/core";
import { baseURL, docs, person } from "@/resources";
import { useState, useEffect } from "react";
import styles from "./docs.module.scss";

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<(typeof docs.documents)[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories
  const categories = ["all", ...new Set(docs.documents.map((doc) => doc.category))];

  // Filter documents by category
  const filteredDocs =
    selectedCategory === "all"
      ? docs.documents
      : docs.documents.filter((doc) => doc.category === selectedCategory);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <Column maxWidth="l" gap="xl" paddingY="xl">
      {/* Header Section */}
      <Column gap="m" horizontal="center">
        <Row
          fitWidth
          border="brand-alpha-medium"
          background="brand-alpha-weak"
          radius="full"
          padding="4"
          gap="8"
          vertical="center"
          style={{
            backdropFilter: "blur(var(--static-space-1))",
          }}
        >
          <Icon paddingLeft="12" name="document" onBackground="brand-weak" />
          <Row paddingX="8">
            <Text variant="body-default-s" onBackground="brand-medium">
              {docs.documents.length} document{docs.documents.length > 1 ? "s" : ""} disponible
              {docs.documents.length > 1 ? "s" : ""}
            </Text>
          </Row>
        </Row>

        <Heading variant="display-strong-l">{docs.title}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: "600px", textAlign: "center" }}>
          {docs.description}
        </Text>
      </Column>

      {/* Category Filter */}
      {categories.length > 1 && (
        <Row gap="8" wrap horizontal="center">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
            >
              {category === "all" ? "Tous" : category}
            </button>
          ))}
        </Row>
      )}

      {/* Documents Grid */}
      {filteredDocs.length > 0 ? (
        <div className={styles.documentsGrid}>
          {filteredDocs.map((doc, index) => (
            <button
              type="button"
              key={`${doc.title}-${doc.file}`}
              className={styles.documentCard}
              onClick={() => setSelectedDoc(doc)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <Icon name="document" size="l" />
                </div>

                <Column gap="8" fillWidth>
                  <Text variant="heading-strong-m" className={styles.cardTitle}>
                    {doc.title}
                  </Text>

                  <Text
                    variant="body-default-s"
                    onBackground="neutral-weak"
                    className={styles.cardDescription}
                  >
                    {doc.description}
                  </Text>

                  <Row gap="8" wrap style={{ marginTop: "auto" }}>
                    <Tag size="s" variant="neutral">
                      {doc.category}
                    </Tag>
                    {doc.date && (
                      <Tag size="s" variant="neutral">
                        {doc.date}
                      </Tag>
                    )}
                  </Row>

                  {doc.tags && doc.tags.length > 0 && (
                    <Row gap="4" wrap>
                      {doc.tags.map((tag) => (
                        <span key={`${doc.title}-${tag}`} className={styles.docTag}>
                          {tag}
                        </span>
                      ))}
                    </Row>
                  )}
                </Column>

                <div className={styles.viewButton}>
                  <Icon name="eye" size="s" />
                  <span>Consulter</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <Column
          horizontal="center"
          vertical="center"
          gap="m"
          padding="xl"
          className={styles.emptyState}
        >
          <div className={styles.emptyIcon}>
            <Icon name="document" size="xl" />
          </div>
          <Text variant="heading-strong-m">Aucun document disponible</Text>
          <Text variant="body-default-m" onBackground="neutral-weak" style={{ textAlign: "center" }}>
            {selectedCategory !== "all"
              ? "Aucun document trouvé dans cette catégorie."
              : "Les rapports de projets seront bientôt disponibles."}
          </Text>
        </Column>
      )}

      {/* PDF Viewer Modal */}
      {selectedDoc && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedDoc(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="document"
          >
            <div className={styles.modalHeader}>
              <Column gap="4" flex={1}>
                <Text id="pdf-modal-title" variant="heading-strong-m">{selectedDoc.title}</Text>
                <Row gap="8">
                  <Tag size="s">{selectedDoc.category}</Tag>
                  {selectedDoc.date && <Tag size="s">{selectedDoc.date}</Tag>}
                </Row>
              </Column>
              <button type="button" className={styles.closeButton} onClick={() => setSelectedDoc(null)}>
                <Icon name="close" size="m" />
              </button>
            </div>

            <div className={styles.pdfContainer}>
              {/* Using object tag with PDF.js or embed to prevent download */}
              <object
                data={`${selectedDoc.file}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                type="application/pdf"
                className={styles.pdfViewer}
              >
                <div className={styles.pdfFallback}>
                  <Icon name="document" size="xl" />
                  <Text variant="heading-strong-m">Impossible de charger le PDF</Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Votre navigateur ne supporte pas l'affichage de PDF intégré.
                  </Text>
                </div>
              </object>
            </div>

            <div className={styles.modalFooter}>
              <Text variant="body-default-s" onBackground="neutral-weak">
                <Icon name="lock" size="s" style={{ marginRight: "4px" }} />
                Document en lecture seule - Téléchargement désactivé
              </Text>
            </div>
          </div>
        </div>
      )}
    </Column>
  );
}
