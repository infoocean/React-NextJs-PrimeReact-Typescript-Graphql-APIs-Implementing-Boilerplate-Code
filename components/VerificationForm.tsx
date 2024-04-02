import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { VerificationFormProps } from "@/types/auth";

const VerificationForm: React.FC<VerificationFormProps> = ({
  buttonText,
  onSubmit,
  fields,
  onCancel
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
      <form onSubmit={handleSubmit}>
        <div className="gridcss">
          {fields.map((field) => (
            <div
              style={{ textAlign: "left" }}
              key={field.name}
              className="verifycss"
            >
              <InputText
                placeholder={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                maxLength={field.maxLength}
                className="verifydigit"
              />
            </div>
          ))}
        </div>
        <div className="gridbuttoncss mt-5">
          <Button
            className="w-full"
            type="submit"
            label={buttonText}

          /> &emsp;
          <Button
            className="w-full p-2"
            type="submit"
            label="Cancel"
          />
        </div>
      </form>
  );
};

export default VerificationForm;
