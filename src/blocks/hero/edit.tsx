import { __ } from "@wordpress/i18n";

import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";

import { Button } from "@wordpress/components";

import "./editor.scss";
import TextInput from "../../components/TextInput";
import { bindAttribute } from "../../utils/bindAttribute";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { imageId, imageUrl } = attributes;

  const bind = bindAttribute(attributes, setAttributes);

  const banner = (
    <section className="jm-section jm-hero">
      <div className="hero-text">
        <TextInput {...bind("heading")} tagName="h1" />
        <TextInput {...bind("text")} />
      </div>
      <div
        className="hero-img"
        style={
          {
            "--background-image": imageUrl ? `url(${imageUrl})` : "none",
          } as React.CSSProperties
        }
      >
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(image: { id: number; url: string }) => {
              setAttributes({
                imageId: image.id,
                imageUrl: image.url,
              });
            }}
            type="image"
            allowedTypes={["image"]}
            render={({ open }) => (
              <Button variant="primary" onClick={open}>
                {imageId
                  ? __("Replace Image", "hero")
                  : __("Select Image", "hero")}
              </Button>
            )}
          />
        </MediaUploadCheck>
      </div>
    </section>
  );

  return <div {...useBlockProps()}>{banner}</div>;
}
