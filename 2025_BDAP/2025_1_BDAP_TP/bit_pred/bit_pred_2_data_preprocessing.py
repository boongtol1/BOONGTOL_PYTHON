
from bit_pred_1_data_collect import fetch_bithumb_candles

import pandas as pd

def preprocess_candles(df: pd.DataFrame) -> pd.DataFrame:
    """
    1) 인덱스를 KST(Asia/Seoul) datetime으로 설정
    2) 결측치는 직전 값으로 보간(Forward Fill)
    3) 1시간 후 종가(target) 컬럼 생성
    """
    df = df.copy()

    # 1) 인덱스를 UTC로 간주하고 KST로 변환
    #    (만약 df.index가 naive datetime이라면 UTC로 로컬라이즈 후 변환)
    df.index = pd.to_datetime(df.index)
    df.index = df.index.tz_localize('UTC').tz_convert('Asia/Seoul')

    # 2) 결측치 처리: 직전 값 보간법
    df.fillna(method='ffill', inplace=True)

    # 3) 레이블 생성: 1시간 뒤 종가
    #    1시간 간격이므로 shift(-1)을 사용
    df['target'] = df['close'].shift(+1)

    return df

# 사용 예시
if __name__ == '__main__':
    # 이미 fetch_bithumb_candles()로 가져온 df가 있다고 가정
    df = fetch_bithumb_candles('BTC_KRW', '1h')

    # 전처리
    df_preprocessed = preprocess_candles(df)

    # 결과 확인
    print(df_preprocessed.head())
    print(df_preprocessed[['close', 'target']].tail())

    # (원한다면) CSV로 저장
    df_preprocessed.to_csv('btc_1h_candles_preprocessed.csv')
