import React, {useEffect, useState} from 'react'
import { api } from '../constants'
import styles from './Pages.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import IButton from '@mui/material/Button';

export function Articles () {
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState('')

    const getFetchArticles = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(api)
            if(res.ok) {
                const data = await res.json()
                setArticles(data)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // fetch(api)
        // .then((res) => res.json())
        // .then((data) => setArticles(data))
        // getFetchArticles()
    }, [])

    return (
        <>
            <h1 className={styles.header}>Articles</h1>
            <div className={styles.btnAPI}>
                <IButton 
                    onClick={getFetchArticles}
                    variant="outlined" 
                    size="medium">
                        GET API
                </IButton>
            </div>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading &&
                <div className={styles.card}>
                    {articles.map((article) => (
                        <Card sx={{ maxWidth: 345 }} key={article.id}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.imageUrl}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.newsSite}
                                        <br/>
                                        <br/>
                                        {article.summary}
                                        <a href={article.url}>link</a>
                                        <br/>
                                        <br/>
                                        {article.publishedAt}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            }
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
  }
  