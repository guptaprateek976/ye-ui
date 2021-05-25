import clsx from "clsx";
import { uniqueId } from "lodash-es";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiOutlineReload } from "react-icons/ai";
import { UPLOAD_FILE_STATUS } from "../../../../lib/uploadFile";
import Spinner from "../../content/Spinner/Spinner";
import CircleProgress from "../../progress/CircleProgress/CircleProgress";
import { Button } from "../Button";
import formStyles from "../form.module.css";
import styles from "./fileInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function FileInput({
  size = "medium",
  iconBefore,
  iconAfter,
  label,
  variant,
  onFocus,
  onBlur,
  isBusy,
  spacing,
  className,
  inputClassName,
  files,
  updateFiles,
  uploadFiles,
  placeholder = "Browse",
  ...props
}) {
  const [hasFocus, setHasFocus] = useState(false);
  const idRef = useRef(uniqueId("input_"));

  const handleFocus = (e) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  const handleBlur = (e) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (event) => {
    if (event.target.files.length) {
      updateFiles(Array.from(event.target.files), "add");
    }
  };

  useEffect(() => {}, [files]);

  return (
    <div className={clsx(styles.root, className)}>
      <label
        className={clsx(
          formStyles[`is-${size}`],
          styles.wrapper,
          styles[`is-${variant}`],
          {
            [styles.hasFocus]: hasFocus,
          }
        )}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        {iconBefore ? (
          <span className={clsx(styles.iconWrapper)}>
            <span className={clsx(formStyles.icon, styles.icon)}>
              {iconBefore}
            </span>
          </span>
        ) : null}
        <input
          id={idRef}
          type="file"
          className={clsx(styles.input)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <span className={clsx(styles.placeholder, inputClassName)}>
          {placeholder}
        </span>
        {iconAfter ? (
          <span className={clsx(styles.iconWrapper, styles.iconRight)}>
            <span className={clsx(formStyles.icon, styles.icon)}>
              {iconAfter}
            </span>
          </span>
        ) : null}
        {isBusy ? <Spinner className={styles.spinner} /> : null}
      </label>
      {files && files.length ? (
        <div className={styles.list}>
          {files.map((item) => (
            <div className={styles.listItem}>
              <div className={styles.listItemText}>{item.file.name}</div>
              {item.status === UPLOAD_FILE_STATUS.uploading ? (
                <>
                  <div
                    className={clsx(styles.listItemStatusText, styles.progress)}
                  >
                    Uploading...
                  </div>
                  <div className={styles.listItemStatusIcon}>
                    <CircleProgress
                      squareSize={18}
                      progress={item.progress}
                      className={styles.listItemProgress}
                    />
                  </div>
                </>
              ) : item.status === UPLOAD_FILE_STATUS.uploaded ? (
                <>
                  <div
                    className={clsx(styles.listItemStatusText, styles.success)}
                  >
                    Uploaded
                  </div>
                  <div className={styles.listItemStatusIcon}>
                    <Button
                      onClick={() => updateFiles([item], "remove")}
                      variant="trans"
                      spacing="equal"
                      className={styles.listItemProgressIcon}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                </>
              ) : item.status === UPLOAD_FILE_STATUS.failed ? (
                <>
                  <div
                    className={clsx(styles.listItemStatusText, styles.failed)}
                  >
                    Failed
                  </div>
                  <div className={styles.listItemStatusIcon}>
                    <Button
                      onClick={() => uploadFiles([item])}
                      variant="trans"
                      spacing="equal"
                      className={styles.listItemProgressIcon}
                    >
                      <AiOutlineReload />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

FileInput.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Icon element
   */
  iconBefore: PropTypes.element,
  /**
   * Icon element
   */
  iconAfter: PropTypes.element,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Label text
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};