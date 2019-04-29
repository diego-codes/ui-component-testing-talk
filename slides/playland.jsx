const DeleteRecordButton = props => (
  <Button
    size="sm"
    kind="danger"
    onClick={props.deleteRecord}
  >
    Delete record
  </Button>
)

test('camelCases string', () => {
  const actual = camelCase('i_like_snakes_🐍')
  expect(actual).toBe('iLikeSnakes🐍')
})

test('it renders', () => {
  
})