export const field = (attributes: any, setAttributes: any) => {
  return (key: string) => {
    return {
      value: attributes[key],
      onChange: (value: any) => {
        setAttributes({
          [key]: value,
        });
      },
    };
  };
};
