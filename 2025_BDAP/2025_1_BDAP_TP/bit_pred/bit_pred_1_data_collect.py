import requests
import pandas as pd

def fetch_bithumb_candles(pair: str = 'BTC_KRW', interval: str = '1h') -> pd.DataFrame:
    """
    Bithumb 공개 API에서 지정된 종목(pair)과 차트 간격(interval) 캔들 데이터를 가져와
    pandas DataFrame으로 반환합니다.
    """
    url = f'https://api.bithumb.com/public/candlestick/{pair}/{interval}'
    resp = requests.get(url)
    resp.raise_for_status()

    result = resp.json()
    if result.get('status') != '0000':
        raise RuntimeError(f"API error, status: {result.get('status')}")

    # data 필드에 [timestamp, open, close, high, low, volume] 리스트가 들어있음
    candles = result['data']

    # API가 최신순으로 반환하는 경우 시간순으로 뒤집기
    candles.reverse()

    # DataFrame 생성
    df = pd.DataFrame(candles, columns=[
        'timestamp',  # UNIX 시간(ms)
        'open',       # 시가
        'close',      # 종가
        'high',       # 고가
        'low',        # 저가
        'volume'      # 거래량
    ])

    # timestamp를 datetime으로 변환 (단위 ms -> 초 단위라면 unit='s' 로 변경)
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    df.set_index('timestamp', inplace=True)

    return df

if __name__ == '__main__':
    # 1) 데이터 가져오기
    df = fetch_bithumb_candles('BTC_KRW', '1h')

    # 2) DataFrame 확인
    print(df.head())

    # 3) CSV로 저장
    output_path = 'btc_1h_candlestick.csv'
    df.to_csv(output_path)
    print(f"Saved to {output_path}")
