import './style.scss';
import {useState} from 'react';
import {CaretDownIcon, CaretUpIcon} from '@phosphor-icons/react';

export interface DropdownItemType {
  id: number,
  value: string,
}

export interface DropdownType {
  id: number,
  label: string,
  items: DropdownItemType[],
  className?: string,
}

export function Dropdown({props, onActiveChange, activeId} : {props: DropdownType, onActiveChange: (id: number) => void, activeId: number}) {
  const [selectedId, setSelectedId] = useState<number>(activeId);
  const [open, setOpen] = useState<boolean>(false);

  const onClickItem = (itemCurrent: DropdownItemType) => {
    onActiveChange(itemCurrent.id)
    setSelectedId(itemCurrent.id);
    setOpen(false);
  }

  let classNames = 'dropdown ';

  if (props.className) {
    classNames = classNames + props.className;
  }

  return <div className={classNames}>
    <div className={`dropdown__selected`} onClick={() => setOpen(!open)}>
      <p style={{fontWeight: 600}}>{props.label} :</p>
      <div className={'dropdown__selected_button'}>
        <p>{props.items.find((item) => item.id === selectedId)?.value}</p>
        {open
          ? <CaretUpIcon size={25} style={{marginLeft: '0.5rem'}}/>
          : <CaretDownIcon size={25} style={{marginLeft: '0.5rem'}}/>
        }
      </div>

    </div>
    <div className={`dropdown__list ${open  ? 'open' : ''}`}>
      {props.items.map((item) => {
        return <div
          key={item.id}
          onClick={() => onClickItem(item)}
          className={'dropdown__list_item'}
        >
          <p>{item.value}</p>
        </div>;
      })}
    </div>
  </div>;
}