import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "span";

type TextInputProps = {
  attribute: string;
  onChange: (value: string) => void;
  tagName?: TextTag;
  placeholder?: string;
  className?: string;
};

const TextInput = ({
  attribute,

  onChange,
  tagName = "p",
  placeholder,
  className = "",
}: TextInputProps) => {
  return (
    <RichText
      tagName={tagName}
      allowedFormats={[]}
      value={attribute}
      onChange={onChange}
      placeholder={placeholder ?? __("Enter text here", "jm-theme")}
      className={className}
    />
  );
};

export default TextInput;
