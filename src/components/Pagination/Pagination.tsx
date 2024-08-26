import styles from './Pagination.module.css';

export type PaginationProps = {
  page: number,
  last: number,
  prev: number|null,
  next: number|null,
  goToPage: (goToPage:number) => void
}

const Pagination = (props: PaginationProps) => {


  return <div className={styles.paginationContainer}>
    { props.prev !== null ? 
      <a href="#" className={[styles.paginationButton, styles.enabledPage, styles.first].join(' ')}  onClick={ () => props.goToPage( Number(props.prev) ) }>&lt;&lt;</a> : 
      <a href="#" className={[styles.paginationButton, styles.disabledPage, styles.first].join(' ')}>&lt;&lt;</a> 
    }
    { Array(props.last).fill('').map( (_, index ) =>  {
      const oneBaseIndex = index + 1;
      return (<>
        { oneBaseIndex === props.page && <a href="#" key={index} className={[styles.paginationButton, styles.disabledPage].join(' ')}>{props.page}</a> }
        { oneBaseIndex !== props.page && <a href="#" key={index} className={[styles.paginationButton, styles.enabledPage].join(' ')} onClick={ () => props.goToPage(oneBaseIndex) }>{oneBaseIndex}</a> }
        
      </>  )
    }
      
     ) 
    }
    { props.next !== null ? 
      <a href="#" className={[styles.paginationButton, styles.enabledPage, styles.last].join(' ')} onClick={ () => props.goToPage( Number(props.next) ) }>&gt;&gt;</a> : 
      <a href="#" className={[styles.paginationButton, styles.disabledPage, styles.last].join(' ')}>&gt;&gt;</a> 
    }
  </div>
}

export default Pagination;