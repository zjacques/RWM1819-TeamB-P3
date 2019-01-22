class Vector2
{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  //Operators
  plus(v)
  {
    if(v instanceof Vector2){
      return new Vector2(this.x + v.x, this.y + v.y);

    }
    else{
      return new Vector2(this.x + v, this.y + v);
    }
  }
  plusEquals(v)
  {
    if(v instanceof Vector2){
      this.x += v.x;
      this.y += v.y;
    }
    else{
      this.x += v;
      this.y += v;
    }
  }

  multiply(val)
  {
    if(val instanceof Vector2){
      return new Vector2(this.x * val.x, this.y * val.y);
    }
    else{
      return new Vector2(this.x - v.x, this.y - v.y);
    }
  }

  multiplyEquals(val)
  {
    if(val instanceof Vector2){
      this.x *= val.x;
      this.y *= val.y;
    }
    else{
      this.x *= val;
      this.y *= val;
    }
  }

  minus(v)
  {
    if(v instanceof Vector2){
          return new Vector2(this.x - v.x, this.y - v.y);
    }
    else{
          return new Vector2(this.x - v, this.y - v);
    }
  }

  distance(v)
  {
    return this.minus(v).magnitude();
  }

  magnitude()
  {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y));
  }

  normalise()
  {
  	if (this.x == 0 && this.y == 0)
  		return Vector2(0,0);

  	var len = this.magnitude();
  	return Vector2(this.x / len, this.y / len);
  }

  sqrdMagnitude()
  {
    return Math.pow(this.x, 2) + Math.pow(this.y);
  }

  //Converts vector to string
  toString()
  {
    return "(" + this.x.toString() + "," + this.y.toString() + ")";
  }


}