export interface DigitProps {
  className?: string;
  digits?: number;
  value: number;
}

export default function NumberDisplay(props: DigitProps) {
  return (
    <div className={props.className}>
      {props.digits ? 
        props.value.toString().padStart(props.digits, "0") : 
        props.value}
    </div>
  );
}