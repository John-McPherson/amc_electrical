import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";

import TextInput from "../../components/TextInput";
import bindFields from "../../utils/bindFields";
import ButtonLink from "../../components/ButtonLink";
import MediaInput from "../../components/MediaInput";

export default function Edit({ attributes, setAttributes }) {
  const bind = bindFields(attributes, setAttributes);
  const { imageUrl } = attributes;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <section className="jm-section jm-text-with-image">
        <div className="jm-section__container">
          <div className="jm-section__column">
            <TextInput {...bind.text("label")} tagName="p" className="label" />

            <div className="text-content">
              <TextInput {...bind.text("heading")} tagName="h2" />
              <TextInput {...bind.text("text")} />
            </div>

            <ButtonLink text={bind.text("linkText")} link={bind.link("link")} />
          </div>

          <div className="column">
            <div className="jm-image">
              {imageUrl && <img src={imageUrl} />}
              <MediaInput {...bind.media("imageId", "imageUrl")} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
