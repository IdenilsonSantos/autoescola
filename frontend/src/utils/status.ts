
type Status = 0 | 1;

function mapStatus(status: Status): string {
  switch (status) {
    case 0:
      return "Em andamento";
    case 1:
      return "Concluída";
    default:
      return "Status desconhecido";
  }
}

export default mapStatus