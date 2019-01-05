package window;

public class Cal2 {
	int		res;
	
	public	int	add(int	x, int y) {
		res	= x + y;
		System.out.println("두 수의 덧셈은 " + res);
		return	res;
	}
	
	public	int	sub(int	x, int y) {
		res	= x - y;
		System.out.println("두 수의 뺄셈은 " + res);
		return	res;
	}
	
	public	int	mul(int	x, int y) {
		res	= x * y;
		System.out.println("두 수의 곱셈은 " + res);
		return	res;
	}
	
	public	int div(int	x, int y) {
		res	= x / y;
		System.out.println("두 수의 나눗셈은 " + res);
		return	res;
	}

}
