import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ButtonForInput from "@/components/ButtonForInput";
import styles from "./../components/Account.module.css";

const AccountPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const [tags, setTags] = useState();

  const handleChange = (e) => {
    console.log(selectedFile);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      M.toast({ html: "Пожалуйста выберите файл", classes: "rounded" });
      return;
    }

    const formData = newFormdata();
    formData.append(file, setSelectedFile);
    formData.append(tags, setSelectedFile);
  };

  const tagsChange = (e) => {
    setTags(e.target.value);

    console.log(e.target.value);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <div className="row">
        <div className="col s12">
          <div className="col s4 offset-s1">
            <div className="col s12 m8">
              <div className="card">
                <div className="card-image">
                  <Image
                    src="/defaultphoto.jpg"
                    alt="фотоаппарат"
                    width={500}
                    height={200}
                    priority
                  />
                  <span className="card-title">Ruslan Sharipov</span>
                </div>
                <div className="card-content">
                  <p className={styles.userInfo}>
                    email:
                    <span
                      className="badge green"
                      style={{
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      sharipov.r@mail.ru
                    </span>
                  </p>
                  <p className={styles.userInfo}>
                    фотографий:
                    <span
                      className="badge green"
                      style={{
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      55
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col s5  offset-s2 ">
            <div className="col s6">
              <p
                className="flow-text teal-text lighten-3"
                style={{ marginBottom: "10px" }}
              >
                Загрузите файл
              </p>
            </div>
            <form className="col s12 ">
              <div className="row">
                <div className="file-field input-field col s8">
                  <div className="btn">
                    <span>File</span>
                    <input
                      type="file"
                      onChange={handleChange}
                      accept="image/*, .png,.jpg,.gif,.web,"
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8">
                  <input
                    id="first_name"
                    type="text"
                    className="validate"
                    {...register("tags", {
                      onChange: tagsChange,
                      required: "Поле обязательно к заполнению",
                      minLength: {
                        value: 5,
                        message: "Минимум 5 символов",
                      },
                    })}
                  />
                  <label htmlFor="first_name">теги</label>
                  <span className="helper-text">
                    {errors?.tags && errors?.tags?.message}
                  </span>
                </div>
              </div>
              <ButtonForInput
                handleUpload={handleUpload}
                text={"загрузить"}
                isvalid={isValid}
              />
            </form>
          </div>
          {selectedFile && (
            <div className="col s3 offset-s2">
              <ul className="collection">
                <li className="collection-item">имя: {selectedFile.name}</li>
                <li className="collection-item">тип: {selectedFile.type}</li>
                <li className="collection-item">
                  размер: {(selectedFile.size / 1024 / 1024).toFixed(1)} мБ
                </li>
                <li className="collection-item">
                  дата последнего изменения:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="flow-text center-align">Мои фотографии</p>
      <div className="row">
        <div className="col s12 m3">
          <div className="card">
            <div className="card-image">
              <Image
                src="/defaultphoto.jpg"
                alt="айди заголовок"
                width={200}
                height={200}
                priority
              />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col s12 m3">
          <div className="card">
            <div className="card-image">
              <Image
                src="/defaultphoto.jpg"
                alt="айди заголово"
                width={200}
                height={200}
                priority
              />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
