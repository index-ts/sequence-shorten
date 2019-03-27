export default class SequenceShorten<T> {
  public readonly charset: string;
  public readonly base: number;
  public readonly lookup: any;
  public readonly _indexOne: number = 0;
  public readonly _indexTwo: number = 26;
  public readonly _indexThree: number = 52;
  public readonly _a: number;
  public readonly _A: number;
  public readonly _0: number;
  public readonly _z: string;
  public readonly _Z: string;
  public readonly _9: string;

  public constructor()
  {
    this.charset = `${new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ).toLowerCase() ).toString().replace(/,/g,"")}${new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) ).toString().replace(/,/g,"")}0123456789`;
    this.base = this.charset.length;
    this._a = this._lookUpCharset({})[this.charset[this._indexOne]];
    this._A = this._lookUpCharset({})[this.charset[this._indexTwo]];
    this._0 = this._lookUpCharset({})[this.charset[this._indexThree]];
    this._z = this._lookUpCharset({})['z'];
    this._Z = this._lookUpCharset({})['Z'];
    this. _9 = this._lookUpCharset({})['9'];
  }

  private _lookUpCharset(charsetByIndex?: {[key: string]: any}): {[key: string]: any}
  {
    for (let i = 0, l = this.charset.length; i < l; i++) {
      const char = this.charset[i];
      charsetByIndex[char] = char.charCodeAt(0);
    }
    return charsetByIndex;
  }

  public encode(seqNum: number): string
  {
    const url: string[] = [];
    while (seqNum) {
      url.push(this.charset[seqNum % this.base]);
      seqNum = ~~(seqNum / this.base);
    }

    return url.reverse().join('');
  }

  public decode(seqNum: string): number {
    let id: number = 0;
    for (let i: number = 0, l = seqNum.length; i < l; i++) {
      const charCode = this._lookUpCharset({})[seqNum[i]];
      if (this._a <= charCode && charCode <= this._z) {
        id = ((id * this.base) + charCode) - this._a;
      }
      if (this._A <= charCode && charCode <= this._Z) {
        id = ((id * this.base) + charCode) - this._A + this._indexTwo;
      }
      if (this._0 <= charCode && charCode <= this._9) {
        id = ((id * this.base) + charCode) - this._0 + this._indexThree;
      }
    }

    return id;
  }
}

console.log('seq', new SequenceShorten().encode(112323));
console.log('seq', new SequenceShorten().decode(new SequenceShorten().encode(112323)));

