  
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState({name: '', born: ''})

  const result = useQuery(ALL_AUTHORS); 
  console.log('ALL_AUTHORS: ', result);

  const [editBorn, editBornResult] = useMutation(EDIT_BORN, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  
  if (!props.show) {
    return null
  }

  const authors = result.data?.allAuthors ? result.data.allAuthors : [];

  const editBornYear = e => {
    e.preventDefault(); 
    editBorn({variables: {name: author.name, born: author.born}})
    setAuthor({name: '', born: ''})
  }

  const handleSelect = e => {
    console.log(e.target.value);
    setAuthor({name: e.target.value, born: author.born})
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set born year</h2>
      <form onSubmit={editBornYear}>

        <select value={author.name} onChange={handleSelect}>
          {authors.concat({name: '', born: ''}).map(each => {
            return <option value={each.name}>{each.name}</option>
          })}
        </select>

        <div> born <input type='number' value={author.born}
        onChange={({target})=>setAuthor({name: author.name, born: +target.value})}/> </div>
        <div><button type='submit'>edit</button></div>
      </form>

    </div>
  )
}

export default Authors
