interface PropsForRank {
    totalRank: number;
}

export const Rank: React.FC<PropsForRank> = ({totalRank}) => {
    return (
        <div className=" flex align-middle justify-center">
            <div>
                <p>{`Your current rank is...`}</p>
            </div>
            <div>
                <p>{`${totalRank}`}</p>
            </div>
        </div>
    )
}