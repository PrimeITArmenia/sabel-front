import style from "./wont-to-delate.module.scss";

function WontToDealte() {
  return (
    <section className={style.wont_to_dealte_section}>
      <div className={`${style.wont_to_dealte}`}>
        <img
          height={55}
          width={55}
          src="./../assets/icons/dashboard_warning.svg"
        />
        <p>Are you sure you want to dalate</p>
        <button>Delate</button>
        <a>Cancle</a>
      </div>
    </section>
  );
}

export default WontToDealte;
