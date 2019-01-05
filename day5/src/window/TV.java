package window;

public class TV {
	boolean	onOff;
	int		channel;
	int		volume;
	int		size;
	String	color;
	String	name;
	
	
	public	TV() {
			name	= "My TV";
			onOff	= false;
			channel	= 10;
			size	= 42;
			color	= "Black";
	}

	public	void	info() {
		System.out.println("TV information")
	}
	public	void	turnOn() {
		onOff	= true;
	}
	
	public	void	turnOff() {
		onOff	= false;
	}

	public	void	change(int	ch) {
		channel	= ch;
	}
}
