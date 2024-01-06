import { observer } from "mobx-react";
import { useCallback, useContext, useState } from "react";

import Modal from "../common/Modal";
import { GlobalConfigContext } from "../data/Config";

export function ConfigIcon() {
  const [isModalVisible, setModalVisibility] = useState(false);
  const hideCallback = useCallback(() => setModalVisibility(false), []);

  return (<>
    {isModalVisible && <ConfigModal onEscape={hideCallback} />}
    <div 
      className="w-32 h-32 opacity-0 hover:opacity-100 cursor-pointer uppercase flex items-center justify-center font-bold" 
      onClick={() => setModalVisibility(true)}>
        Secret
    </div>
  </>);
}

export interface ConfigModal {
  onEscape: () => void;
}

export const ConfigModal = observer((props: ConfigModal) => {
  useContext(GlobalConfigContext);

  return (
    <Modal onEscape={props.onEscape}>
      <div className="w-96 p-4">
        <div className="flex flex-row justify-between mb-4 w-full border-b-2 pb-4">
          <h2 className="font-bold text-lg">
            Options
          </h2>
          <button className="font-bold" onClick={props.onEscape}>
            X
          </button>
        </div>
      </div>
    </Modal>
  );
});