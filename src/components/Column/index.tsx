interface IColumn {
  header1: string;
  header2: string;
  header3: string;
  header4: string;
}

const Column: React.FC<IColumn> = ({ header1, header2, header3, header4 }) => {
  return (
    <div className="sc-krvtoX w-full">
      <div></div>
      <div>{header1}</div>
      <div>{header2}</div>
      <div>{header3}</div>
      <div>{header4}</div>
    </div>
  );
};

export default Column;
