const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload); //CHuyen object -> array gom co key/value

  fields.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không thể bỏ trống trường này.",
        },
      ]);
      invalids++;
    }
  });

  fields.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu phải có tối thiểu 6 kí tự",
            },
          ]);
          invalids++;
        }
        break;

      case "phone":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ",
            },
          ]);
          invalids++;
        }
        break;

      case "price":
      case "area":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa đặt giá trị cho trường này",
            },
          ]);
        }
        if (isNaN(+item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Trường này phải là số!",
            },
          ]);
        }
        break;

      default:
        break;
    }
  });
  return invalids;
};

export default validate;
