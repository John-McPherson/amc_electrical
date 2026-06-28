import { __ } from "@wordpress/i18n";

import {
  useBlockProps,
  RichText,
  LinkControl,
  BlockControls,
} from "@wordpress/block-editor";

import { Popover, ToolbarButton } from "@wordpress/components";

import { link as linkIcon } from "@wordpress/icons";

import "./editor.scss";
import { useRef, useState } from "react";

export default function Edit({ attributes, setAttributes }) {
  const { label, heading, text, link, linkText, imageId, imageUrl } =
    attributes;

  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const linkButtonRef = useRef(null);

  const linkPopover = isLinkOpen && (
    <Popover
      anchorRef={linkButtonRef.current}
      onClose={() => setIsLinkOpen(false)}
    >
      <div style={{ minWidth: 300, padding: 12 }}>
        <LinkControl
          value={link}
          onChange={(value) =>
            setAttributes({
              link: {
                ...link,
                ...value,
              },
            })
          }
          onRemove={() => {
            setAttributes({
              link: {
                url: "",
                opensInNewTab: false,
              },
            });
            setIsLinkOpen(false);
          }}
        />
      </div>
    </Popover>
  );

  return (
    <div {...useBlockProps()}>
      <BlockControls>
        <ToolbarButton
          ref={linkButtonRef}
          icon={linkIcon}
          label={__("Edit link", "jm-theme")}
          isPressed={isLinkOpen}
          onClick={() => setIsLinkOpen((open) => !open)}
        />
      </BlockControls>

      <section className="jm-section jm-text-with-image">
        <div className="column">
          <RichText
            tagName="p"
            className="label"
            allowedFormats={[]}
            value={label}
            onChange={(value) => setAttributes({ label: value })}
            placeholder={__("Label to go here", "jm-theme")}
          />

          <div className="text-content">
            <RichText
              tagName="h2"
              allowedFormats={[]}
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder={__("Heading to go here", "jm-theme")}
            />

            <RichText
              tagName="p"
              allowedFormats={[]}
              value={text}
              onChange={(value) => setAttributes({ text: value })}
              placeholder={__("Text to go here", "jm-theme")}
            />
          </div>

          <RichText
            tagName="a"
            className="jm-button"
            value={linkText}
            allowedFormats={[]}
            placeholder={__("Button text", "jm-theme")}
            onChange={(value) => setAttributes({ linkText: value })}
            withoutInteractiveFormatting
          />
        </div>

        <div className="column">{/* Image goes here */}</div>
      </section>

      {linkPopover}
    </div>
  );
}
