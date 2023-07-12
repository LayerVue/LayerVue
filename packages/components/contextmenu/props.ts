export interface ContextmenuProps {
  items: {
    label: string;
    onClick: () => void;
  }[];
  offSet: {
    left: number;
    top: number;
  };
}

export interface ContextmenuInst {
  setVisible: (value: boolean) => void;
}
