/**
 * HTMLの表示/非表示を切り替える処理
 * @param elm
 * @param visible
 */
const displayChange = (
  elm: HTMLElement,
  visible: boolean
) => {
  if (visible) {
    elm.style.display = 'block';
    /* elm.classList.remove('modalUnvisible');
    elm.classList.add('modalVisible'); */
  } else {
    elm.style.display = 'none';
    /* elm.classList.remove('modalVisible');
    elm.classList.add('modalUnvisible'); */
  }


};

export default displayChange;